describe('Station1', function () {
  beforeEach(() => {
    // functionの前に必ず実行される
    // baseUrlのrootへ
    cy.visit('/station1.html')
  })

  // FIXME: 機能していない
  it('`<html>`タグが存在する', function () {
    cy.get('html').should('be.visible')
  })

  it('`<img>`タグに`src`と`alt`属性がある', function () {
    cy.get('img').should('have.attr', 'alt')
    cy.get('img').should('have.attr', 'src', './assets/image/otya.jpg')
  })

  it('タイトルは`<p>`タグで，`id`および`class`属性をもたない', function () {
    const titleTemplate = 'タイトル'

    cy.get('p').should(($p) => {
      const firstP = $p.first()
      expect(firstP).to.contain(titleTemplate)
      expect(firstP[0].className).to.be.not.ok
      expect(firstP[0].id).to.be.not.ok
    })
  })

  // 一番目の<span>もしくは<p>の内容が`descriptionTemplate`と一致することをテストする
  it('タイトルは`<span>`または`<p>`タグで，`id`および`class`属性をもたない', function () {
    const descriptionTemplate = 'サブタイトル'

    cy.get('body')
      .then(($jQ) => {
        const spanTag = $jQ.find('span')
        return spanTag.length === 0 ? $jQ.find('p').eq(1) : spanTag
      })
      .then(($target) => {
        expect($target).to.not.be.empty
        expect($target).to.contain(descriptionTemplate)
        expect($target[0].className).to.be.not.ok
        expect($target[0].id).to.be.not.ok
      })
  })
})
