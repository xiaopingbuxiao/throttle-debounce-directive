/* eslint-disable no-unused-vars */

import { expect } from 'chai'
import { mount, enableAutoDestroy } from '@vue/test-utils'
import Vue from 'vue'
import { Vdebounce } from '../../dist/index.esm.js'
import { sleep } from './util'

Vue.use(Vdebounce)


describe('测试 v-debounce ', () => {
  // enableAutoDestroy(afterEach)
  it('事件绑定成功', () => {
    const wrapper = mount({
      template: '<div v-debounce="increment"></div>',
      data() {
        return {
          count: 0
        }
      },
      methods: {
        increment() {
          this.count++;
        },
      },
    })
    wrapper.trigger('click')
    sleep(300).then(() => {
      expect(wrapper.vm.count).to.equal(1)
    })
  });

  it('传递参数', () => {
    const wrapper = mount({
      template: '<div v-debounce="()=>{ increment(1,2) }"></div>',
      data() {
        return {
          a: 0,
          b: 0
        }
      },
      methods: {
        increment(a, b) {
          this.a = a
          this.b = b
        },
      },
    });
    expect(wrapper.vm.a).to.equal(0)
    expect(wrapper.vm.b).to.equal(0)
    wrapper.trigger('click')
    sleep(300).then(() => {
      expect(wrapper.vm.a).to.equal(1)
      expect(wrapper.vm.b).to.equal(2)
    })
  });

  it('默认尾部执行', (done) => {
    const wrapper = mount({
      template: '<div v-debounce="increment"></div>',
      data() {
        return {
          count: 0
        }
      },
      methods: {
        increment() {
          this.count++;
        },
      },
    })
    wrapper.trigger('click')
    expect(wrapper.vm.count).to.equal(0)
    sleep(300).then(() => {
      expect(wrapper.vm.count).to.equal(1)
      done()
    })
  });

  it('immediate 立即执行', () => {
    const wrapper = mount({
      template: '<div v-debounce.immediate="increment"></div>',
      data() {
        return {
          count: 0
        }
      },
      methods: {
        increment() {
          this.count++;
        },
      },
    })
    wrapper.trigger('click')
    expect(wrapper.vm.count).to.equal(1)
  });

  it('默认时间 300 ms', (done) => {
    const wrapper = mount({
      template: '<div v-debounce="increment"></div>',
      data() {
        return {
          count: 0
        }
      },
      methods: {
        increment() {
          this.count++;
        },
      },
    })
    wrapper.trigger('click')
    sleep(200).then(() => {
      expect(wrapper.vm.count).to.equal(0)
    })
    sleep(300).then(() => {
      expect(wrapper.vm.count).to.equal(1)
      done()
    })
  });

  it('更改时间', (done) => {
    const wrapper = mount({
      template: '<div v-debounce="{cb:()=>{ increment(1,2) },wait:100}"></div>',
      data() {
        return {
          count: 0
        }
      },
      methods: {
        increment() {
          this.count++;
        },
      },
    })
    wrapper.trigger('click')
    sleep(50).then(() => {
      wrapper.trigger('click')
      sleep(100).then(() => {
        expect(wrapper.vm.count).to.equal(1)
      })
    })

    sleep(180).then(() => {
      wrapper.trigger('click')
      sleep(100).then(() => {
        expect(wrapper.vm.count).to.equal(2)
        done()
      })
    })
  });

  it('更改事件类型', () => {
    // const wrapper = mount(ScrollBy)
    const wrapper = mount({
      template: '<div v-debounce:scroll.immediate="{cb:increment,wait:100}"></div>',
      data() {
        return {
          count: 0
        }
      },
      methods: {
        increment() {
          this.count++;
        },
      },
    })
    expect(wrapper.vm.count).to.equal(0)
    wrapper.trigger('scroll')
    console.log(wrapper.vm.count)
    expect(wrapper.vm.count).to.equal(1)
  });

  /*  */
  it('key不规范时导致的bug', (done) => {
    const data = [
      {
        id: 1,
        date: "2016-05-02",
        name: "王小虎11",
        address: "上海市普陀区金沙江路 1518 弄",
      },
      {
        id: 2,
        date: "2016-05-04",
        name: "王小虎22",
        address: "上海市普陀区金沙江路 1517 弄",
      },
      {
        id: 3,
        date: "2016-05-01",
        name: "王小虎33",
        address: "上海市普陀区金沙江路 1519 弄",
      },
    ];
    const wrapper = mount({
      template: `<div>
        <button @click="getData">切换数据</button>
        <ul>
          <li v-for="(item,index) in tableData" v-debounce.immediate="()=>fn(item)" :key="item.id" >你好世界 {{item.name}}</li>
        </ul>
      </div>`,
      data() {
        return {
          tableData: [
            {
              id: 1,
              date: "2016-05-02",
              name: "王小虎11",
              address: "上海市普陀区金沙江路 1518 弄",
            },
          ],
          count: 0,
          name: '王小虎11'
        }
      },
      methods: {
        fn(row) {
          this.name = row.name
        },
        getData() {
          const current = ++this.count % 3;
          this.tableData = data.slice(current, current + 1);
        },
      },
    })
    expect(wrapper.vm.count).to.equal(0)
    wrapper.find('button').trigger('click')
    Vue.nextTick(() => {
      expect(wrapper.find('li').html()).to.have.string('王小虎22')
      wrapper.find('li').trigger('click')
      expect(wrapper.vm.name).to.equal('王小虎22')
      done()
    })
  });
})


