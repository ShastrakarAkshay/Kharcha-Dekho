import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount',
  standalone: true,
})
export class AmountPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) {
      return '';
    }

    // Convert the value to string if it's a number
    let numStr = Number(value).toFixed(2).toString();

    // Custom logic for Indian numbering system (2,36,788)
    let [integerPart, decimalPart] = numStr.split('.'); // Separate integer and decimal part
    let lastThree = integerPart.slice(-3); // Get last 3 digits
    let otherNumbers = integerPart.slice(0, -3); // Get the remaining digits

    // Add commas in the thousands place for the remaining numbers
    if (otherNumbers !== '') {
      otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ','); // Regular expression for Indian format
    }

    // Join the formatted numbers back with the last three digits
    let formattedNumber = otherNumbers
      ? `${otherNumbers},${lastThree}`
      : lastThree;

    // Append the decimal part if it exists
    if (decimalPart) {
      formattedNumber += `.${decimalPart}`;
    }

    return formattedNumber;
  }
}
