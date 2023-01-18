/* eslint-disable @typescript-eslint/no-unused-vars */
import { TCar, TCarCreate } from '../../types/types';

const URL = 'http://localhost:3001';

const garage = `${URL}/garage`;
const engine = `${URL}/engine`;
const winners = `${URL}/winners`;

export default class PostService {
  static async getCarById(id:number) {
    const result = await fetch(`${garage}/${id}`).then((response) => response.json());
    return result;
  }

  static async getCars(currentPage: number, limit = 7) {
    const response = await fetch(`${garage}?_page=${currentPage}&_limit=${limit}`);
    const cars = await response.json();
    const allCarsCount = response.headers.get('X-Total-Count');
    return {
      cars,
      allCarsCount,
    };
  }

  static async createCar(data: TCarCreate) {
    const result = await fetch(garage, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((response) => response.json());
    return result;
  }

  static async deleteCar(id:number) {
    const result = await fetch(`${garage}/${id}`, {
      method: 'DELETE',
    }).then((response) => response.json());
    return result;
  }

  static async updateCar(id: number, data: TCarCreate) {
    const result = await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((response) => response.json());
    return result;
  }

  static async engineStart(id: number) {
    const result = await fetch(`${engine}?id=${id}&status=started`).then((response) => response.json());
    return result;
  }

  static async engineStop(id: number) {
    const result = await fetch(`${engine}?id=${id}&status=stopped`).then((response) => response.json());
    return result;
  }
}
