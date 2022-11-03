<script setup lang="ts">
import data from '~/ItemDetail.json'

const productInfo = data.Data

interface RuleValue {
  RuleValueIndex: number
  RuleIndex: number
  RuleValue: string
  ImageUrl: string
}

const selectedRule: Map<number, RuleValue> = $ref(new Map())
const selectedRuleStock = computed(() => productInfo.StockList.find((stock) => {
  for (const ruleValue of stock.RuleValueList) {
    if (selectedRule.get(ruleValue.RuleIndex)?.RuleValueIndex !== ruleValue.RuleValueIndex)
      return false
  }
  return true
}))

const show = $ref(false)
</script>

<template>
  <div text-left h-100vh bg-light>
    <van-swipe class="my-swipe" :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in data.Data.ImageList" :key="image">
        <img :src="image" h-56 w-full>
      </van-swipe-item>
    </van-swipe>

    <div bg-white border-rounded mb-2 pt-4 pb-2 px-2>
      <div mb-2>
        <span text-red text-xl mr-6 font-bold>￥89</span>
        <del><span text-gray text-sm>￥299</span></del>
      </div>
      <div mb-1>
        {{ productInfo.ItemName }}
      </div>
      <div text-sm text-gray mb-1>
        {{ productInfo.TagLine }}
      </div>
      <div flex justify-between text-sm>
        <span>销量 {{ productInfo.SaleVolume }}</span>
        <span>收藏</span>
      </div>
    </div>

    <div flex items-center bg-white px-1 py-2 cursor-pointer @click="show = true">
      <span mr-4 font-bold>选择</span>
      <span flex="1" text-sm>{{ selectedRuleStock?.StockName }} ({{ productInfo.StockList.length }}个可选规格)</span>
      <span>...</span>
    </div>

    <div bg-white mt-2>
      <van-divider :style="{ marginTop: 0 }">
        宝贝详情
      </van-divider>
      <div v-html="productInfo.Detail" />
    </div>

    <div flex justify-around items-center pos="fixed bottom-0" h-12 bg-white w-full>
      <div flex justify-around items-center flex-col>
        <van-icon name="shop-o" />
        <span text-sm>首页</span>
      </div>
      <div flex justify-around items-center flex-col>
        <van-icon name="service-o" />
        <span text-sm>客服</span>
      </div>
      <div flex justify-around items-center flex-col>
        <van-icon name="shopping-cart-o" />
        <span text-sm>购物车</span>
      </div>
      <van-button round color="#fbbd08" size="small">
        <span text-white>加入购物车</span>
      </van-button>
      <van-button round color="#e83030" size="small">
        <span text-white>立即购买</span>
      </van-button>
    </div>
  </div>

  <van-popup v-model:show="show" position="bottom" :style="{ height: '70vh', borderRadius: '6px 6px 0 0' }">
    <span pos="absolute right-4 top-2" cursor-pointer @click="show = false">x</span>
    <div h-full p-4 text-left>
      <div flex>
        <img :src="selectedRuleStock?.ImageUrl ?? productInfo.ImageUrl" border-rounded h-45 w-45 bg-blue>
        <div flex="~ col" justify-end ml-4>
          <span text-xl font-bold text-red>￥89</span>
          <span v-if="selectedRuleStock?.StockNum" text-sm>库存{{ selectedRuleStock?.StockNum }}</span>
        </div>
      </div>

      <div v-for="rule in productInfo.RuleList" :key="rule.RuleIndex" my-4>
        <span text-sm font-bold>{{ rule.RuleName }}</span>
        <div mt-4 grid grid-cols-3 gap-2>
          <van-button
            v-for="item in rule.RuleValues"
            :key="item.RuleValueIndex"
            round color="#f7f7f7"
            @click="selectedRule.set(rule.RuleIndex, item)"
          >
            <span :class="item.RuleValueIndex === selectedRule.get(rule.RuleIndex)?.RuleValueIndex ? 'text-red' : 'text-black'">{{ item.RuleValue }}</span>
          </van-button>
        </div>
      </div>

      <van-button round color="#e83030" block>
        <span text-white>立即购买</span>
      </van-button>
    </div>
  </van-popup>
</template>

<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>

<route lang="yaml">
meta:
  layout: ''
  </route>
