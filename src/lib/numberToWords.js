// Indian currency number to words conversion

const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
               'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen',
               'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
               'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function convertHundreds(n) {
  if (n === 0) return '';
  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
  return ones[Math.floor(n / 100)] + ' Hundred' +
    (n % 100 ? ' And ' + convertHundreds(n % 100) : '');
}

export function numberToIndianWords(amount) {
  if (amount === 0) return 'Zero Only';
  
  // Handle decimals (paise)
  const [rupees, paise] = amount.toString().split('.').map(num => parseInt(num || 0));

  const crore = Math.floor(rupees / 10000000);
  const lakh  = Math.floor((rupees % 10000000) / 100000);
  const thou  = Math.floor((rupees % 100000) / 1000);
  const rem   = rupees % 1000;

  let result = '';
  if (crore) result += convertHundreds(crore) + ' Crore ';
  if (lakh)  result += convertHundreds(lakh)  + ' Lakh ';
  if (thou)  result += convertHundreds(thou)  + ' Thousand ';
  if (rem)   result += convertHundreds(rem);

  result = result.trim() + ' Rupees';

  if (paise && paise > 0) {
    result += ' And ' + convertHundreds(paise) + ' Paise';
  }

  return result + ' Only';
}
