<template>
    <div class="field-file">
        <form enctype="multipart/form-data" method="post">
            <div class="file-tips">
                <strong class="str-tips">
                    <slot name="tips">(文件小于15M)</slot>
                </strong>
            </div>
            <div class="file-upload">
                <span class="upload-btn">上传文件</span>
                <el-input :value="item.url" size="small" disabled></el-input>
                <input type="file" name="image" :accept="mime||'*/*'" @change="doUploadFile" @click="doReset" class="upload-file">
                <span class="uploading" v-if="ctrl.state==1">上传中...</span>
                <span class="uploading" v-else-if="ctrl.state==2">上传失败</span>
            </div>
        </form>
    </div>
</template>
<style lang="less">
@import '../style/commonEdit.less';
.field-file {
    border: 1px solid #ddd;
    padding: 5px;
    width: 350px;
    .file-tips {
        font-weight: normal;
        padding-bottom: 5px;
    }
    .file-upload {
        position: relative;
        padding-bottom: 5px;
        .el-input {
            width: 75%;
        }
        .upload-file {
            width: 70px;
            height: 30px;
            opacity: 0;
            position: absolute;
            top: 0;
            right: 0;
        }
        .upload-btn {
            display: inline-block;
            width: 70px;
            line-height: 25px;
            text-align: center;
            float: right;
            border: 1px solid #ccc;
            font-size: 13px;
            border-radius: 2px;
            cursor: pointer;
            padding: 1px 5px;
        }
        .uploading {
            color: red;
            display: block;
        }
    }
}
</style>
<script>
import lib from "../server/util.js"

export default {
    props: ['maxSize', 'value', 'mime'],
    data() {
        return {
            item: {
                url: (this.value && this.value.url) || '',
                md5: '',
                fileSize: '',
            },
            ctrl: {
                state: 0,
                maxSize: this.maxSize || 15 * 1024 * 1024,
            }
        }
    },
    watch: {
        value(value, oldValue) {
            if (value === this.item) return;
            this.item = value;
        },
        item(value, oldValue) {
            this.$emit('input', value);
        }
    },
    methods: {
        doReset(e) {
            let form = e.target.parentElement.parentElement;
            form.reset();
            this.ctrl.state = 0;
        },
        doUploadFile(e) {
            let file = e.target.files[0];
            let form = e.target.parentElement.parentElement;
            let isUpload = this.validateSize(file);
            if (isUpload) {
                let xhr = new XMLHttpRequest();
                xhr.open('post', 'http://10.112.187.198:8088/api/paper', true);
                xhr.onload = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        try {
                            let ret = JSON.parse(xhr.responseText);
                            if (ret.errno === 0) {
                                let url = ret.data.url;
                                let md5 = ret.data.contentMd5;
                                let fileSize = ret.data.fileSize;
                                this.item = {
                                    url,
                                    md5,
                                    fileSize,
                                };
                                this.ctrl.state = 0;
                            } else {
                                this.ctrl.state = 2;
                                this.failNotice(ret.msg);
                            }

                        } catch (e) {
                            this.ctrl.state = 2;
                            this.failNotice();
                        }
                        this.$emit('uploaded', this.ctrl.state, this.item);
                    }
                };
                xhr.onerror = (e) => {
                    this.ctrl.state = 2;
                    this.failNotice();
                };
                this.ctrl.state = 1;
                xhr.send(new FormData(form));
            }
        },
        validateSize(file) {
            let ret = 1;
            if (file.size > this.ctrl.maxSize) {
                ret = 0;
                this.failNotice('文件存储空间过大');
            }
            return ret;
        },
        failNotice(msg) {
            alert({
                title: '提示',
                text: msg || '上传失败',
            });
        }
    }
}
</script>