var swal = document.createElement('script');
swal.setAttribute('src', '//cdn.jsdelivr.net/npm/sweetalert2@11');
document.head.appendChild(swal);

var url = () => window.location;

var regex = target => {
    return "https:\/\/.*\.jusbrasil.com.br\/" + target + "\/[0-9]*\/.*"
};

var modalAlerts = {
    success: {
        title: "<strong>Copiado com sucesso!</strong>",
        imageUrl: 'https://raw.githubusercontent.com/heraclitothiago/juscopy/main/assets/download.png',
        imageWidth: 180,
        width: 600,
        showConfirmButton: false,
        html: `Fortaleça nossa causa 💪
<br> Doe-nos 💸 qualquer quantia ☕ e incentive o desenvolvimento de facilidades que o beneficiarão sempre 🤩
<br><b>Pix</b> dradvloper@gmail.com`
    },
    fail: {
        title: "<strong>Ooops!</strong>",
        icon: 'error',
        showConfirmButton: false,
        html: `Parece que você não está no ambiente correto
<br>Tente acessar as páginas de Jurisprudência ou de Modelos de Peças no Jusbrasil
<br>Acesse a página da documentação <a href="https://github.com/heraclitothiago/juscopy">Juscopy</a>`
    }
}

function juscopyBtn(father) {
    //Cria um botão novo
    var btnJuscopy = document.createElement('a')
    btnJuscopy.classList.add('btn')
    btnJuscopy.classList.add('btn--orange')
    btnJuscopy.setAttribute("onclick", "disableModal()")
    btnJuscopy.innerText = "Copiar com Juscopy"
        //adiciona o ícone ao botão
    var icon = document.createElement('span');
    icon.classList.add('icon');
    icon.classList.add('icon-content-copy');
    btnJuscopy.appendChild(icon)
    divToAppend = document.querySelector(father)
    divToAppend.appendChild(btnJuscopy)
}

var removeBtn = selector => {
    var btn = document.querySelector(selector)
    btn.remove()
}

if (url().href.match(regex('modelos-pecas'))) {
    //Remove os botões download e copiar da jurisprudência
    removeBtn(".DocumentActionsCard-download-btn")
    removeBtn(".DocumentActionsCard-copy-btn")

    juscopyBtn(".DocumentActionsCard-actions");
    var disableModal = () => {
        var juscopy = document.querySelector(".unprintable")
        navigator.clipboard.writeText(juscopy.innerText)
        Swal.fire(modalAlerts.success)
        scroll(0, 0)
    }

} else if (url().href.match(regex('processos'))) {
    removeBtn("button.btn--blue:nth-child(1)")
    juscopyBtn(".ToolBarBase-leftActions");

    var disableModal = () => {
        var juscopy = document.querySelector("div.unprintable:nth-child(5)")
        navigator.clipboard.writeText(juscopy.innerText)
        Swal.fire(modalAlerts.success)
        scroll(0, 0)
    }
    disableModal()

} else if (url().href.match(regex('jurisprudencia'))) {
    try {
        var btn = document.querySelector("button.btn--blue");
        btn.click()
    } catch (e) {}
    removeBtn(".CopyContentModal-copyButton")
    juscopyBtn(".modal-footer")
    var disableModal = () => {
        var juscopy = document.querySelector(".modal-body > div:nth-child(2)");
        navigator.clipboard.writeText(juscopy.innerText)
        Swal.fire(modalAlerts.success)
        scroll(0, 0)
        try {
            //fecha a modal no caso de jurisprudência
            var btnFechar = document.querySelector(".CopyContentModal-closeButton");
            btnFechar.click()
        } catch (e) {}
    }

} else {
    throw new console.error("Você não está no ambiente correto do jusbrasil");
}