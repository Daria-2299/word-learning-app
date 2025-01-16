import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

class Word {
  id;
  german = "";
  russian = "";
  tags = "";

  constructor(german, russian, tags, id = uuidv4()) {
    makeAutoObservable(this);
    this.id = id;
    this.german = german;
    this.russian = russian;
    this.tags = tags;
  }
}

class WordsStore {
  wordList = [];
  filteredWords = [];
  loading = true;
  error = null;
  filterTag = "";

  constructor() {
    makeAutoObservable(this);
    this.fetchWords();
  }

  async fetchWords() {
    this.loading = true;
    try {
      const response = await fetch("/words");
      if (!response.ok) throw new Error("Что-то пошло не так ...");

      const data = await response.json();
      runInAction(() => {
        this.wordList = data.map(
          (item) => new Word(item.german, item.russian, item.tags, item.id)
        );
        this.setFilterTag(this.filterTag);
      });
    } catch (e) {
      runInAction(() => {
        this.error = e.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async deleteWord(id) {
    try {
      const response = await fetch(`/words/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        runInAction(() => {
          this.wordList = this.wordList.filter((item) => item.id !== id);
          this.setFilterTag(this.filterTag);
        });
      } else {
        throw new Error("Не удалось удалить слово");
      }
    } catch (e) {
      runInAction(() => {
        this.error = e.message;
      });
    }
  }

  async addWord(newWordInfo) {
    try {
      const newWord = new Word(
        newWordInfo.german,
        newWordInfo.russian,
        newWordInfo.tags
      );
      const response = await fetch("/words", {
        method: "POST",
        body: JSON.stringify(newWord),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        const data = await response.json();
        runInAction(() => {
          const createdWord = new Word(
            data.german,
            data.russian,
            data.tags,
            data.id
          );
          this.wordList.push(createdWord);
          this.setFilterTag(this.filterTag);
        });
      } else {
        throw new Error("Не удалось добавить слово");
      }
    } catch (e) {
      runInAction(() => {
        this.error = e.message;
      });
    }
  }

  async updateWord(updateWord) {
    try {
      const response = await fetch(`/words/${updateWord.id}`, {
        method: "PUT",
        body: JSON.stringify(updateWord),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        const data = await response.json();
        runInAction(() => {
          const index = this.wordList.findIndex(
            (item) => item.id === updateWord.id
          );
          if (index !== -1) {
            this.wordList[index] = new Word(
              data.german,
              data.russian,
              data.tags,
              data.id
            );
            this.setFilterTag(this.filterTag);
          }
        });
      } else {
        throw new Error("Не удалось сохранить изменения");
      }
    } catch (e) {
      runInAction(() => {
        this.error = e.message;
      });
    }
  }

  setFilterTag(tag) {
    this.filterTag = tag;
    this.filteredWords = this.wordList.filter((item) => item.tags === tag);
  }

  getCurrentWord(id) {
    return this.wordList.find((item) => item.id === id);
  }
}

export const wordsStore = new WordsStore();
export const WordsStoreContext = createContext(wordsStore);
