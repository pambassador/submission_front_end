<template>
    <li class="li-edit-item field-select">
        <span class="sp-edit-title">{{title}}</span>
        <div class="d-edit-wrap">
            <strong class="str-required" v-if='required'>*</strong>
            <span class="sp-edit-inner">
                <el-select v-model="cValue" filterable placeholder="输入筛选" :disabled='!!disabled' size="small" @change='change'>
                    <el-option
                        v-for="item in list"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </span>
            <strong class="str-tips">
                <slot name="tips"></slot>
            </strong>
            <strong class="str-tips str-tip-warn" v-if="!verify">输入不能为空</strong>
        </div>
    </li>
</template>
<style lang="less">
@import '../style/commonEdit.less';
.sp-edit-inner {
    width: 200px;
}
</style>
<script>
import lib from "../server/util.js"

export default {
    props: ['title', 'required', 'value', 'list', 'disabled'],
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
        change(item) {
            this.$emit('change', item);
        }
    }
}
</script>