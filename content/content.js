function getId(id) {
    return $(`#${id}`)
}

function reload() {
    let mydata = {}
    const nama = getId('nama');
    chrome.storage.sync.get('nama', function (opt) {
        nama.prop('value', opt['nama']);
        mydata.nama = opt['nama']
    })
    const keterangan = getId('keterangan');
    chrome.storage.sync.get('keterangan', function (opt) {
        keterangan.prop('value', opt['keterangan']);
        mydata.keterangan = opt['keterangan']
    })
    const kelas = getId('kelas');
    chrome.storage.sync.get('kelas', function (opt) {
        kelas.prop('value', opt['kelas']);
        mydata.kelas = opt['kelas']
    })

    chrome.storage.sync.get('activate', function (opt) {
        if (opt.activate) {
            console.log('jdkasfl')
            document.querySelector('.quantumWizTextinputPaperinputInput ').value = mydata.nama;

            cb = $(`.freebirdFormviewerComponentsQuestionBaseRoot .freebirdFormviewerComponentsQuestionRadioOptionContainer:contains('${mydata.kelas}') label`).click();
            cb = $(`.freebirdFormviewerComponentsQuestionBaseRoot .freebirdFormviewerComponentsQuestionRadioOptionContainer:contains('${mydata.keterangan}') label`).click();
            document.querySelector('.quantumWizTextinputPaperinputInput ').focus()
        }
    })
}

function getParam() {
    let paramData = []
    let param = '?'
    // input = document.querySelectorAll('input[name*="entry"]')
    // input.forEach((e, i) => {
    //     param += e.name.replace('_sentinel', '') + '=value'
    //     if(i < input.length -1) {
    //         param += '&'
    //     }
    // })

    // let entries = FB_PUBLIC_LOAD_DATA_[1][1]
    let loaddata = JSON.parse(document.body.querySelector('script').innerHTML.replace('var FB_PUBLIC_LOAD_DATA_ = ', '').replace(';', ''))
    let entries = loaddata[1][1]

    for(const entry of entries) {
        if(entry[4]) {

            name = 'entry.' + entry[4][0][0];
            first_value = 'value'
            if(entry[4][0][1]) {
                first_value = entry[4][0][1][0][0];
            }
            newData = {
                name: name,
                value: first_value.replace(/\s/gi, '+')
            }
            paramData.push(newData)
        }
    }

    paramData.forEach((e, i) => {
        param += e.name + '=' +e.value
        if(i < paramData.length -1) {
            param += '&'
        }
    })



    id = window.location.pathname.split('/')[4];
    let url = `https://docs.google.com/forms/d/e/${id}/viewform${param}`;

    const prefill = url;
    console.log('prefill url:', prefill)
}

$(function () {

    let detector = setInterval(function () {
        let target = document.querySelector('.freebirdFormviewerComponentsQuestionBaseRoot')
        if (target) {
            getParam()
            reload();
            clearInterval(detector)
        }
    }, 500)

})
