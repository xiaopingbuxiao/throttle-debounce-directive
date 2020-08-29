import { expect } from 'chai'
import { debounce } from '../../lib/index'
import { sleep } from './util'

describe('debounce测试', () => {
  let data;
  beforeEach(() => {
    data = 0
  });

  it('返回是一个函数', () => {
    let fn = debounce(function () {
      data++
    }, 300)
    expect(typeof fn).to.equal('function')
  });

  it('默认时间300ms', (done) => {
    let fn = debounce(function () {
      data++
    })
    fn()
    expect(data).to.equal(0)
    sleep(100).then(() => {
      expect(data).to.equal(0)
    })
    sleep(300).then(() => {
      expect(data).to.equal(1)
      done()
    })
  });

  it('立即执行', () => {
    let fn = debounce(function () {
      data++
    }, 300, true)
    fn()
    expect(data).to.equal(1)
  });

  it('测试参数', (done) => {
    let a = 0, b = 0;
    let fn = debounce(function (aValue, bValue) {
      a = aValue
      b = bValue
    }, 300, true)
    fn(1, 2)
    sleep(300).then(() => {
      expect(a).to.equal(1)
      expect(b).to.equal(2)
      done()
    })
  });

  it('测试返回值', () => { // 只有立即执行函数才有返回值 延后执行的函数因为 setTimeout 原因 拿不到返回值
    let fn = debounce(function () {
      return 1
    }, 300, true)
    expect(fn()).to.equal(1)
  });

  it('测试取消执行', (done) => {
    let fn = debounce(function () {
      data++
    }, 300, false)
    fn()
    sleep(100).then(() => {
      fn.cancel()
    })
    sleep(300).then(() => {
      expect(data).to.equal(0)
      done()
    })
  });

});