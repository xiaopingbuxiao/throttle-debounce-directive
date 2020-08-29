
/* eslint-disable no-unused-vars */

import { expect } from 'chai'
import { mount, enableAutoDestroy, shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import { Vthrottle } from '../../dist/index.esm.js'
import { sleep } from './util'


Vue.use(Vthrottle)


describe('测试 v-throttle ', () => {
  // enableAutoDestroy(afterEach)
  it('事件绑定', () => {
    const wrapper = shallowMount({
      template: '<div v-throttle="increment">你好</div>',
      data() {
        return {
          count: 0
        }
      },
      methods: {
        increment() {
          this.count++
        },
      },
    })
    expect(wrapper.vm.count).to.equal(0)
    wrapper.trigger('click')
    expect(wrapper.vm.count).to.equal(1)
  });
  it('参数', () => {
    const wrapper = mount({
      template: '<div v-throttle="()=>{ increment(1,2) }"></div>',
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
    expect(wrapper.vm.a).to.equal(1)
    expect(wrapper.vm.b).to.equal(2)
  });
  it('首部不执行', () => {
    const wrapper = mount({
      template: '<div v-throttle="{cb:increment,leading:false}"></div>',
      data() {
        return {
          count: 0
        }
      },
      methods: {
        increment() {
          this.count++
        },
      },
    });
    expect(wrapper.vm.count).to.equal(0)
    wrapper.trigger('click')
    expect(wrapper.vm.count).to.equal(0)
    sleep(300).then(() => {
      expect(wrapper.vm.count).to.equal(1)
    })
  });


  it('默认时间 300 ms', () => {
    const wrapper = mount({
      template: '<div v-throttle="{cb:increment,leading:false}"></div>',
      data() {
        return {
          count: 0
        }
      },
      methods: {
        increment() {
          this.count++
        },
      },
    });
    expect(wrapper.vm.count).to.equal(0)
    wrapper.trigger('click')
    expect(wrapper.vm.count).to.equal(0)
    sleep(200).then(() => {
      expect(wrapper.vm.count).to.equal(0)
    })
    sleep(300).then(() => {
      expect(wrapper.vm.count).to.equal(1)
    })
  });

  it('更改时间', () => {
    const wrapper = mount({
      template: '<div v-throttle="{cb:()=>{ increment(1,2) },leading:false,wait:100}">你好</div>',
      data() {
        return {
          count: 0
        }
      },
      methods: {
        increment() {
          this.count++
        },
      },
    });
    expect(wrapper.vm.count).to.equal(0)
    wrapper.trigger('click')
    expect(wrapper.vm.count).to.equal(0)
    sleep(100).then(() => {
      expect(wrapper.vm.count).to.equal(1)
    })
  });

  it('更改事件类型', () => {
    const wrapper = mount({
      template: '<div v-throttle:scroll="{cb:()=>{ increment(1,2) },leading:false,wait:100}"></div>',
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
    sleep(100).then(() => {
      expect(wrapper.vm.count).to.equal(1)
    })
  });


  it('尾部不执行', () => {
    const wrapper = mount({
      template: '<div v-throttle:scroll="{cb:()=>{ increment(1,2) },wait:100,trailing:false}"></div>',
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
    expect(wrapper.vm.count).to.equal(1)
    setTimeout(() => {
      wrapper.trigger('scroll')
      sleep(200).then(() => {
        expect(wrapper.vm.count).to.equal(1)
      })
    }, 50);

  });



})





