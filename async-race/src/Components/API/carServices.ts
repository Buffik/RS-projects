/* eslint-disable @typescript-eslint/no-unused-vars */
import { TCar, TCarCreate, TWinner } from '../../types/types';

const URL = 'http://localhost:3000';

const garage = `${URL}/garage`;
const engine = `${URL}/engine`;
const winners = `${URL}/winners`;

export default class CarService {
  static async getCarById(id:number) {
    const result = await fetch(`${garage}/${id}`).then((response) => response.json());
    return result;
  }

  static async getCars(currentPage: number, limit = 7) {
    const response = await fetch(`${garage}?_page=${currentPage}&_limit=${limit}`);
    const cars: TCar[] = await response.json();
    const allCarsCount: string | null = response.headers.get('X-Total-Count');
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

  static async createMultipleCars(data:TCarCreate[]) {
    const carsRequests = data.map((item) => CarService.createCar(item));
    const result = await Promise.all(carsRequests);
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
    const result = await (await fetch(`${engine}?id=${id}&status=started`, { method: 'PATCH' })).json();
    return result;
  }

  static async engineStop(id: number) {
    const result = await fetch(`${engine}?id=${id}&status=stopped`, { method: 'PATCH' }).then((response) => response.json());
    return result;
  }

  static async driveCar(id:number) {
    const response = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
    const result = response.status === 200;
    return result;
  }

  static async getWinners(currentPage: number, sort?: string, order?: string, limit = 10) {
    function getStringToSort(s?: string, o?: string) {
      if (s && o) return `&_sort${s}&_order${o}`;
      return '';
    }
    const response = await fetch(`${winners}?_page=${currentPage}&_limit=${limit}&${getStringToSort(sort, order)}`);
    const winnerCars: TWinner[] = await response.json();
    const allCarsCount: string | null = response.headers.get('X-Total-Count');
    return {
      winnerCars,
      allCarsCount,
    };
  }

  static async getWinnerById(id:number) {
    const result = await fetch(`${winners}/${id}`).then((response) => response.json());
    return result;
  }

  static async getWinnerStatus(id:number) {
    const result = (await fetch(`${winners}/${id}`)).status;
    return result;
  }

  static async deleteWinner(id:number) {
    const result = await (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();
    return result;
  }

  static async createWinner(data: TWinner) {
    const result = await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((response) => response.json());
    return result;
  }

  static async updateWinner(id: number, data: TWinner) {
    const result = await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((response) => response.json());
    return result;
  }

  static async saveWinner(time :number, id :number) {
    const currentWinnerStatus = await CarService.getWinnerStatus(id);

    if (currentWinnerStatus === 404) {
      await CarService.createWinner({ wins: 1, time, id });
    } else {
      const winner: TWinner = await CarService.getWinnerById(id);
      await CarService.updateWinner(id, {
        id,
        wins: winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      });
    }
  }
}
