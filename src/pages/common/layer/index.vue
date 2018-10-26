<template>
    <div id="dialogLayer" class="pop-layer" v-show="show" v-cloak>
        <div class="cover"></div>
        <div class="content" v-bind:class="type">
            <div class="title" v-html="title"></div>
            <div class="body">
                <div v-if="type == 'alert'">
                    <p class="text" v-html="text"></p>
                    <div class="btn-wrap">
                        <a class="single-btn" v-on:click="yes">确定</a>
                    </div>
                </div>
                <div v-if="type == 'confirm'">
                    <p class="text" v-html="text"></p>
                    <div class="btn-wrap">
                        <a class="single-btn" v-on:click="yes">确定</a>
                        <a class="single-btn single-btn-grey" v-on:click="no">取消</a>
                    </div>
                </div>
                <div v-if="type == 'prompt'">
                    <p class="text" v-html="text"></p>
                    <div class="d-input">
                        <input type="text" class="ipt-tips" v-model='input'>
                        <span v-if='options&&options.length>0'>
                            <el-select class="select-tips" v-on:change="doSelect" v-model='selected'>
                                <el-option v-for="item in options" 
                                    :value="item" 
                                    :key="item" 
                                    :label="item">
                                </el-option> 
                            </el-select>
                        </span>
                    </div>
                    <div class="btn-wrap">
                        <a class="single-btn" v-on:click="yes">确定</a>
                        <a class="single-btn single-btn-grey" v-on:click="no">取消</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
@color0: #e6e6e6;
@color1: #f9f9f9;
.pop-layer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    .cover {
        width: 100%;
        height: 100%;
        background: #000;
        opacity: .5;
    }
    .confirm,
    .alert,
    .prompt {
        position: absolute;
        left: 50%;
        top: 35%;
        width: 300px;
        background: #fff;
        margin-left: -150px;
        font-size: 14px;

        .title {
            line-height: 35px;
            background: @color0;
            color: @color1;
            padding: 0 10px;
        }
        .text {
            padding: 15px 0;
        }
        .btn-wrap {
            padding: 10px 0 0;
            text-align: right;
        }
        .body {
            padding: 10px;
        }
    }
    .single-btn {
        background: @color0;
        line-height: 2;
        display: inline-block;
        padding: 0 10px;
        border-radius: 3px;
        color: #fff;
        font-size: 14px;

        &:hover {
            background: #3765a0;
            cursor: pointer;
        }
    }
    .single-btn-grey {
        background: #ccc;

        &:hover {
            background: #c1c1c1;
        }
    }
    .disable {
        background: #ccc;
        cursor: not-allowed;
    }
    .ipt-tips{
        line-height: 25px;
        font-size:14px;
        border-radius: 3px 0 0 3px;
        border:1px solid #ccc;
        width:80%;
        outline:none;
        margin:5px 0;
        padding-left: 5px;
    }
    .select-tips{
        width:25px;
        vertical-align: middle;
       .el-input__inner{
           height: 27px;
           border-radius: 0 3px;
           border: 1px solid #ccc;
           margin-left: -5px;
           padding-right: 10px;
       }
    }
    .prompt{
        .text{
            margin:0;
        }
    }

}
</style>
<script>
export default {
    data: {
        show: false,
        type: 'alert',
        title: '',
        text: '',
        input:'',
        selected: '',
        options:[],
        fired: 0,
        onYes: () => {},
        onNo: () => {}
    },
    methods: {
        doHide() {
            this.show = false;
        },
        doSelect() {
            this.input = this.selected;
            this.selected = '';
        },
        yes() {
            this.onYes(this.input);
            this.doHide();
        },
        no() {
            this.onNo();
            this.doHide();
        },
        confirm(config) {
            this.show = true;
            this.type = 'confirm';
            this.title = config.title;
            this.text = config.text;
            this.onYes = () => {};
            this.onNo = () => {};
            if (config.yes) {
                this.onYes = config.yes;
            }
            if (config.no) {
                this.onNo = config.no;
            }
        },
        alert(config) {
            this.show = true;
            this.type = 'alert';
            this.title = config.title;
            this.text = config.text;
            this.onYes = () => {};
            if (config.yes) {
                this.onYes = config.yes;
            }
        },
        prompt(config) {
            this.show = true;
            this.type = 'prompt';
            this.title = config.title;
            this.text = config.text;
            this.options = config.options;
            this.input='';
            this.onYes = () => {};
            this.onNo = () => {};
            if (config.yes) {
                this.onYes = config.yes;
            }
            if (config.no) {
                this.onNo = config.no;
            }
        }
    }
}
</script>