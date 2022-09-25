
window.addEventListener('DOMContentLoaded', e => {
    const sidebar = document.body.querySelector('#toggle');
    if (sidebar) {
        sidebar.addEventListener('click', e => {
            e.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});
