const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearGeneratedQRCode();

  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;
  if (url === '') {
    alert('Please enter a valid URL');
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
      setTimeout(() => {
        const saveUrl = qr.querySelector('img').src;
        saveButton(saveUrl);
      }, 50);
    }, 2000);
  }
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
  });
};

const showSpinner = () => {
  document.getElementById('spinner').style.display = 'block';
};
const hideSpinner = () => {
  document.getElementById('spinner').style.display = 'none';
};
hideSpinner();

form.addEventListener('submit', onGenerateSubmit);

const clearGeneratedQRCode = () => {
  qr.innerHTML = '';
  const clearSaveBtn = document.getElementById('save-link');
  if (clearSaveBtn) clearSaveBtn.remove();
};

const saveButton = (saveURL) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList =
    'bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveURL;
  link.download = 'qr code';
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
};
