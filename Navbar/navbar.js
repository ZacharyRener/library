const toggleMobileMenu = () => {
document.querySelector("#mobile-menu").classList.toggle("hidden");
};
const handleHamburgerClick = () => {
document.querySelector(".hamburger").classList.toggle("is-active");
toggleMobileMenu();
};
const navLeave = (event) => {
if (event.target.parentElement.children.length > 1) {
    if (!event.target.parentElement.children[1].matches(":hover")) {
    event.target.parentElement.children[1].classList.toggle("hidden");
    }
}
};
const navEnter = (event) => {
if (event.target.parentElement.children.length > 1)
    event.target.parentElement.children[1].classList.toggle("hidden");
};
const toggleMenu = (event) => {
event.target.classList.toggle("hidden");
};