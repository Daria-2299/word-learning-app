import { makeAutoObservable } from "mobx";

class MenuStore {
  isOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  /** Toggle burger-menu */
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  /** Close burger-menu */
  closeMenu() {
    this.isOpen = false;
  }
}

const menuStore = new MenuStore();
export default menuStore;
