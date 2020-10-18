let that;

class Tab {
  constructor(id) {
    that = this;
    this.main = document.querySelector(id);
    this.add = this.main.querySelector('.tabadd');
    this.ul = this.main.querySelector('.fisrstnav > ul');
    this.fsection = this.main.querySelector('.tabscon');
    this.init()
  }

  //页面完成后重新获取元素
  loadGetNodes() {
    this.lis = this.main.querySelectorAll('li');
    this.sections = this.main.querySelectorAll('section');
    this.remove = this.main.querySelectorAll('.icon-guanbi');
    this.spans = this.main.querySelectorAll('.fisrstnav ul li>span:first-child');
  }

  //初始化事件
  init() {
    this.loadGetNodes();
    this.add.onclick = this.addTab;
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTab;
      this.remove[i].onclick = this.removerTab;
      this.spans[i].ondblclick = this.editTab;
      this.sections[i].ondblclick = this.editTab;
    }
  }

  //排他
  clearClass() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = '';
      this.sections[i].className = '';
    }
  }

  // 1.切换
  toggleTab() {
    that.clearClass();
    this.className = 'liactive';
    that.sections[this.index].className = 'conactive';
  }

  // 2.增加
  addTab() {
    that.clearClass();
    let num = Math.random();
    let newLi = `<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>`;
    let newSection = `<section class="conactive">空白页${num}</section>`;
    that.ul.insertAdjacentHTML('beforeend', newLi);
    that.fsection.insertAdjacentHTML('beforeend', newSection);
    that.init()
  }

  // 3.删除
  removerTab(e) {
    e.stopPropagation();
    let index = this.parentNode.index;
    that.lis[index].remove();
    that.sections[index].remove();
    that.init(); // 删除后重新获取一次元素.
    if (document.querySelector('.liactive')) return  // 让页面发生删除事件时,当前页面上有选中状态的tab栏,不触发下面的点击事件.
    index--;
    if (index = 0) index = index
    // 删除当前li时,让上一个li处于选定状态
    that.lis[index] && that.lis[index].click();
  }

  // 4.编辑
  editTab() {
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); //禁止双击文本选定
    // this.empty()
    let val = this.innerHTML;
    this.innerHTML = `<input type="text">`;
    let input = this.children[0];
    input.value = val;
    input.select();  // 让文本中的内容处于选中状态
    input.onblur = function () {
      this.parentNode.innerHTML = this.value;
    };
    input.onkeyup = function (e) {
      if (e.keyCode == 13) {
        this.blur()
      }
    }
  }
}

new Tab('#tab');  