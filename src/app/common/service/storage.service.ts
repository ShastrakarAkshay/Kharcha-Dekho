import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public storageKey = '';
  public initialData: any[] = [];

  constructor() {
    // Initialize localStorage if not present
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.initialData));
    }
  }

  // Get all items from localStorage
  getAll(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Get item by ID
  getById(id: number): any {
    const data = this.getAll();
    return data.find((item) => item.id === id);
  }

  // Create a new item in localStorage
  create(newItem: any): void {
    const data = this.getAll();
    const newId =
      data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
    newItem.id = newId;
    data.push(newItem);
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // Update an existing item by ID
  update(id: any, updatedItem: any): void {
    let data = this.getAll();
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedItem, id }; // Update and keep the same ID
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } else {
      throw new Error(`Item with ID ${id} not found`);
    }
  }

  // Delete an item by ID
  delete(id: number): void {
    let data = this.getAll();
    data = data.filter((item) => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
}
