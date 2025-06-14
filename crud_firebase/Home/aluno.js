// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBBkY6RpWy1Q8vCqyib9wOcVQMkkrBDtTU",
  authDomain: "jquery-23752.firebaseapp.com",
  databaseURL: "https://jquery-23752-default-rtdb.firebaseio.com",
  projectId: "jquery-23752",
  storageBucket: "jquery-23752.firebasestorage.app",
  messagingSenderId: "711133281293",
  appId: "1:711133281293:web:cb77128f08af71b457a944",
  measurementId: "G-G45CKQGP6Y"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("usuarios");

// Carregar usuários
function carregarUsuarios() {
  db.on("value", (snapshot) => {
    const tbody = $("#tabelaAlunos");
    tbody.empty();
    snapshot.forEach((child) => {
      const user = child.val();
      const key = child.key;
      tbody.append(`
        <tr>
          <td>${user.nome}</td>
          <td>${user.email}</td>
          <td>
            <button class="btn btn-warning btn-sm edit-btn" data-id="${key}">Editar</button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${key}">Excluir</button>
          </td>
        </tr>
      `);
    });
  });
}

// Salvar usuário (create/update)
$("#formUsuario").submit(function (e) {
  e.preventDefault();

  const id = $("#id").val();
  const nome = $("#txtnome").val();
  const email = $("#txtemail").val();

  if (id) {
    db.child(id).update({ nome, email });
  } else {
    db.push({ nome, email });
  }

  this.reset();
  $("#id").val("");
});

// Editar
$(document).on("click", ".edit-btn", function () {
  const id = $(this).data("id");
  db.child(id)
    .get()
    .then((snapshot) => {
      const user = snapshot.val();
      $("#id").val(id);
      $("#txtnome").val(user.nome);
      $("#txtemail").val(user.email);
    });
});

// Excluir
$(document).on("click", ".delete-btn", function () {
  const id = $(this).data("id");
  if (confirm("Tem certeza que deseja excluir?")) {
    db.child(id).remove();
  }
});

// Inicializar
carregarUsuarios();