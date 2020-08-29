import { expect } from 'chai'
import { throttle } from '../../lib/throttle'
import { sleep } from './util'


describe('测试节流函数', () => {
  let data = 0
  beforeEach(() => {
    data = 0
  });

  it('返回一个函数', () => {
    const fn = throttle(function () {
    }, 300)
    expect(typeof fn).to.equal('function')
  });

  it('默认执行时间300', (done) => {
    const fn = throttle(function () {
      data++
    })
    fn()
    expect(data).to.equal(1)
    fn()
    fn()
    fn()
    fn()
    fn()
    expect(data).to.equal(1)
    sleep(300).then(() => {
      expect(data).to.equal(2)
      done()
    })
  });

  it('默认开始执行一次（首部执行）', () => {
    const fn = throttle(function () {
      data++
    })
    fn()
    expect(data).to.equal(1)
  });

  it('默认结束执行一次（尾部执行）', (done) => {
    const fn = throttle(function () {
      data++
    }, 100)
    fn()
    fn()
    fn()
    expect(data).to.equal(1) // 首部执行
    sleep(100).then(() => {
      expect(data).to.equal(2) // 尾部执行一次
      done()
    })
  });

  it(' leading =false 首部不执行', (done) => {
    const fn = throttle(function () {
      data++
    }, 100, { leading: false })

    fn()
    expect(data).to.equal(0)
    sleep(100).then(() => {
      expect(data).to.equal(1)
      done()
    })
  });

  it(' trailing =false 尾部不执行', (done) => {
    const fn = throttle(function () {
      data++
    }, 100, { trailing: false })
    fn()
    fn()
    fn()
    expect(data).to.equal(1)
    sleep(100).then(() => {
      expect(data).to.equal(1)
      done()
    })
  });

  it('测试返回值', (done) => {
    const fn = throttle(function () {
      data++
      return data
    }, 100)
    let i = 10
    expect(fn()).to.equal(1)

    let timer = setInterval(() => {
      console.log(fn())
      i--
      if (i <= 0) {
        clearInterval(timer)
        done()
      }
    }, 50)
  });

});