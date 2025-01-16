import { makeAutoObservable } from "mobx";

class MenuStore {
  isOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }
}

const menuStore = new MenuStore();
export default menuStore;
