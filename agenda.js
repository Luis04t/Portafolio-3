document.addEventListener('DOMContentLoaded', () => {
    const contactList = document.getElementById('contactList');
    const contactForm = document.getElementById('contactForm');
    
    // Función para obtener contactos
    const obtenerContactos = () => {
        fetch('http://www.raydelto.org/agenda.php')
            .then(response => response.json())
            .then(data => {
                mostrarContactos(data);
            })
            .catch(error => console.error('Error al obtener los contactos:', error));
    };

    // Función para mostrar los contactos en la página
    const mostrarContactos = (contactos) => {
        contactList.innerHTML = '<h2>Contactos Guardados</h2>';
        contactos.forEach(contacto => {
            const div = document.createElement('div');
            div.classList.add('contact');
            div.innerHTML = `<p><strong>Nombre:</strong> ${contacto.nombre}</p>
                             <p><strong>Apellido:</strong> ${contacto.apellido}</p>
                             <p><strong>Teléfono:</strong> ${contacto.telefono}</p>`;
            contactList.appendChild(div);
        });
    };

    // Función para agregar un nuevo contacto
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const telefono = document.getElementById('telefono').value;

        const nuevoContacto = {
            nombre: nombre,
            apellido: apellido,
            telefono: telefono
        };

        fetch('http://www.raydelto.org/agenda.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoContacto)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Contacto agregado:', data);
            obtenerContactos(); // Refrescar la lista de contactos
            contactForm.reset(); // Limpiar el formulario
        })
        .catch(error => console.error('Error al agregar el contacto:', error));
    });

    // Obtener los contactos al cargar la página
    obtenerContactos();
});
