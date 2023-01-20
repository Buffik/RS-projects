const models = ['Audi', 'BMW', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Lada', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Renault'];
const suffixes = ['Model S', 'CLK', '12', 'Camry', 'Quashqai', 'Civic', 'CX-6', 'Cayenne', 'Solaris', 'Octavia'];

const generateRandomName = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const result = `${model} ${suffix}`;
  return result;
};

const generateRandomColor = () => {
  const chars = '0123456789ABCDEF';

  let result = '#';

  for (let i = 0; i < 6; i += 1) {
    const element = chars[Math.floor(Math.random() * 16)];
    result += element;
  }
  return result;
};

const generateRandomCars = (count = 100) => {
  const result = new Array(count)
    .fill(1)
    .map(() => ({ name: generateRandomName(), color: generateRandomColor() }));
  return result;
};

export default generateRandomCars;
