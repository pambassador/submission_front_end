<template>
    <li class="li-edit-item field-textarea">
        <span class="sp-edit-title">{{title}}</span>
        <div class="d-edit-wrap">
            <strong class="str-required" v-if='required'>*</strong>
            <span class="sp-edit-desc">
                <textarea v-model="cValue" class='txtarea-desc' :disabled='!!disabled' :placeholder='placeholder' :maxlength='maxlength'></textarea>
            </span>
            <strong class="str-tips str-tip-warn" v-if="!verify">输入不能为空</strong>
        </div>
    </li>
</template>
<style lang="less">
@import '../style/commonEdit.less';

.txtarea-desc {
    width: 98%;
    height: 100px;
    border: 1px solid #ddd;
    outline: none;
    vertical-align: middle;
}

.sp-edit-desc {
    width: 340px;
    background: #eee;
    padding: 10px 10px 10px;
    line-height: 20px;
    border-radius: 2px;
    display: inline-block;
}
</style>
<script>
import lib from "../server/util.js"

export default {
    props: ['title', 'required', 'value', 'disabled', 'placeholder','maxlength'],
    data() {
        return {
            cValue: this.value
        }
    },
    watch: {
        value(value, oldValue) {
            if (value === this.cValue) return;
            this.cValue = value;
        },
        cValue(value, oldValue) {
            this.$emit('input', value);
        }
    },
    computed: {
        verify() {
            return this.verifyFn();
        },
    },
    methods: {
        verifyFn() {
            if (this.required) {
                return lib.verifyFn.notNull(this.cValue);
            } else {
                return true;
            }
        }
    }
}
</script>