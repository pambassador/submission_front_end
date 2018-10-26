<template>
    <li class="li-edit-item field-input">
        <span class="sp-edit-title">{{title}}</span>
        <div class="d-edit-wrap">
            <strong class="str-required" v-if='required'>*</strong>
            <span class="sp-edit-inner">
                <el-input v-model="cValue" size="small" :disabled='!!disabled' :type='type' @change='inputChange' :placeholder="placeholder"></el-input>
            </span>
            <strong class="str-tips" v-if='!noMaxTip'>
                <slot name="tips">最多可输入100个字符</slot>
            </strong>
            <strong class="str-tips str-tip-warn" v-if="!verify">输入不能为空</strong>
        </div>
    </li>
</template>
<style lang="less">
@import '../style/commonEdit.less';
</style>
<script>
import lib from "../server/util.js"

export default {
    props: ['title', 'required', 'value', 'noMaxTip', 'disabled', 'type', 'placeholder'],
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
        },
        inputChange(value) {
            this.$emit('change', value, this);
        }
    }
}
</script>