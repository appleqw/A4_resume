const resume = document.querySelector('#resume');
const editButton = document.querySelector('#editButton');
const resetButton = document.querySelector('#resetButton');
const printButton = document.querySelector('#printButton');
const statusText = document.querySelector('#statusText');
const regions = [...document.querySelectorAll('.editable-region')];

// Bump this key whenever the resume structure changes so an older saved DOM
// cannot overwrite a newly published layout.
const storageKey = 'a4-resume-content-v4';
const originalTemplate = resume.innerHTML;
let isEditing = false;
let saveTimer;

function restoreSavedContent() {
  const saved = localStorage.getItem(storageKey);
  if (saved) resume.innerHTML = saved;
}

function getRegions() {
  return [...document.querySelectorAll('.editable-region')];
}

function setEditing(nextState) {
  isEditing = nextState;
  document.body.classList.toggle('is-editing', isEditing);
  getRegions().forEach((region) => {
    region.contentEditable = String(isEditing);
    region.spellcheck = isEditing;
  });
  editButton.textContent = isEditing ? '完成编辑' : '编辑内容';
  statusText.textContent = isEditing
    ? '正在编辑：修改会自动保存在当前浏览器'
    : '内容已保存，可继续编辑或导出 PDF';
}

function saveContent() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem(storageKey, resume.innerHTML);
    statusText.textContent = '已自动保存到当前浏览器';
  }, 250);
}

editButton.addEventListener('click', () => setEditing(!isEditing));
resume.addEventListener('input', saveContent);

resetButton.addEventListener('click', () => {
  const confirmed = window.confirm('确定恢复到初始模板吗？当前浏览器中的修改将被清除。');
  if (!confirmed) return;
  localStorage.removeItem(storageKey);
  resume.innerHTML = originalTemplate;
  setEditing(false);
  statusText.textContent = '已恢复初始模板';
});

printButton.addEventListener('click', () => {
  setEditing(false);
  document.title = `${resume.querySelector('h1')?.textContent.trim() || '个人'}-简历`;
  window.print();
});

window.addEventListener('beforeprint', () => setEditing(false));
restoreSavedContent();
