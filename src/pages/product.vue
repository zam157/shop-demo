<script lang="ts" setup>
interface FormState {
  spec: string
  subSpecs: string[]
}

const columns = $ref([
  {
    title: '规格名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '规格编码',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '市场价',
    dataIndex: 'marketPrice',
    key: 'marketPrice',
  },
  {
    title: '会员价',
    dataIndex: 'VipPrice',
    key: 'VipPrice',
  },
])

const formStates = reactive<FormState[]>([
  {
    spec: '规格1',
    subSpecs: ['子规格'],
  },
])
const dataSource = $computed(() => formStates.map(i => ({
  name: `${i.spec}:${i.subSpecs.join('/')}`,
  id: '',
  marketPrice: '',
})))

const addSubSpec = (index: number) => {
  formStates?.[index].subSpecs.push('')
}
const deleteSubSpec = (specIndex: number, subSpecIndex: number) => {
  formStates?.[specIndex].subSpecs.splice(subSpecIndex, 1)
}
let newSpecNum = 2
const addSpec = () => {
  formStates.push({
    spec: `规格${newSpecNum}`,
    subSpecs: [''],
  })
  newSpecNum++
}
</script>

<template>
  <ADivider>商品规格</ADivider>
  <div v-for="(formState, index) in formStates" :key="index" p-4>
    <div flex gap-2 w="1/3">
      <AInput v-model:value="formState.spec" />
      <AButton @click="addSubSpec(index)">
        添加子规格
      </AButton>
    </div>
    <div grid grid-cols-3 gap-8 mt-4>
      <div v-for="(_, i) in formState.subSpecs" :key="i" flex gap-2>
        <AInput v-model:value="formState.subSpecs[i]" placeholder="请输入子规格名称" />
        <AButton v-if="formState.subSpecs.length !== 1" @click="deleteSubSpec(index, i)">
          删除
        </AButton>
      </div>
    </div>
  </div>
  <AButton mb-4 @click="addSpec">
    添加规格
  </AButton>
  <ATable :data-source="dataSource" :columns="columns" />
  <Footer />
</template>
