function setOption(options) {
    options.forEach((e) => {
        console.log(e)

        chrome.storage.sync.get(e, function (opt) {
            $(`#${e}`).prop('checked', opt[e]);
            console.log(opt[e])
        })

        $(`#${e}`).change(function () {
            console.log('changed')
            let newval = this.checked;
            chrome.storage.sync.get(e, function (opt) {
                chrome.storage.sync.set({
                    [e]: newval
                });
            })

        });
    })
}

function get(sel) {
    return $(`${sel}`)
}

function getId(id) {
    return $(`#${id}`)
}

$(document).ready(function () {
    options = ['activate'];
    setOption(options);

    load()

    $('#save').click(function (e) { 
        e.preventDefault();
        save()
    });


});

function save() {
    let namaval = $('#nama').val();
    chrome.storage.sync.get('nama', function (opt) {
        chrome.storage.sync.set({
            nama: namaval
        });
    })
    let keteranganval = $('#keterangan').val();
    chrome.storage.sync.get('keterangan', function (opt) {
        chrome.storage.sync.set({
            keterangan: keteranganval
        });
    })
    let kelasval = $('#kelas').val();
    chrome.storage.sync.get('kelas', function (opt) {
        chrome.storage.sync.set({
            kelas: kelasval
        });
    })
}

function load() {
    const nama = getId('nama');
    chrome.storage.sync.get('nama', function (opt) {
    nama.prop('value', opt['nama']);
    console.log(opt['nama'])
    })
    const keterangan = getId('keterangan');
    chrome.storage.sync.get('keterangan', function (opt) {
    keterangan.prop('value', opt['keterangan']);
    console.log(opt['keterangan'])
    })
    const kelas = getId('kelas');
    chrome.storage.sync.get('kelas', function (opt) {
    kelas.prop('value', opt['kelas']);
    console.log(opt['kelas'])
    })
}