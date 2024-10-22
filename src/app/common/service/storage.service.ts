import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public initialData: any[] = [];

  constructor() {
    // Initialize localStorage if not present
    // if (!localStorage.getItem(this.storageKey)) {
    //   localStorage.setItem(this.storageKey, JSON.stringify(this.initialData));
    // }
  }

  // Get all items from localStorage
  getAll(key: string): any[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  // Get item by ID
  getById(key: string, id: number): any {
    const data = this.getAll(key);
    return data.find((item) => item.id === id);
  }

  // Create a new item in localStorage
  create(key: string, newItem: any): void {
    const data = this.getAll(key);
    const newId =
      data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
    newItem.id = newId;
    data.push(newItem);
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Update an existing item by ID
  update(key: string, id: any, updatedItem: any): void {
    let data = this.getAll(key);
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedItem, id }; // Update and keep the same ID
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      throw new Error(`Item with ID ${id} not found`);
    }
  }

  // Delete an item by ID
  delete(key: string, id: number): void {
    let data = this.getAll(key);
    data = data.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(data));
  }
}
