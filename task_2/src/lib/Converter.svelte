<script lang="ts">
  let selectedCurrency1: string = 'RUB';
  let selectedCurrency2: string = 'USD';
  let firstValue: number = 0;
  let secondValue: number = 0;
  let currencyData: { [currency: string]: number } = {};

  const fetchData = async () => {
  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${selectedCurrency2}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    currencyData = data.rates;
    updateDropdown(currencyData, 'currencydropdown1');
    updateDropdown(currencyData, 'currencydropdown2');
    secondValue = currencyData[selectedCurrency2];
    firstValue = currencyData[selectedCurrency1] * secondValue;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

  function updateDropdown(data: { [key: string]: number }, dropdownId: string) {
    const dropdown = document.getElementById(dropdownId) as HTMLSelectElement;
    if (dropdown) {
      for (const currency in data) {
        const option = document.createElement('option');
        option.value = currency;
        option.text = currency;
        dropdown.appendChild(option);
      }
    }
  }

  function getConvertedFirstValue() {
    if (selectedCurrency1 && selectedCurrency2 && firstValue) {
      firstValue = (secondValue * currencyData[selectedCurrency1]);
    }
    return '';
  }
  function getConvertedSecondValue() {
    if (selectedCurrency1 && selectedCurrency2 && firstValue) {
      secondValue = (firstValue / currencyData[selectedCurrency1]);
    }
    return '';
  }

  document.getElementById('currencydropdown1')?.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    selectedCurrency1 = target.value;
  });

  document.getElementById('currencydropdown2')?.addEventListener('change', async (event) => {
    const target = event.target as HTMLSelectElement;
    selectedCurrency2 = target.value;
  });

  fetchData();

</script>
<h2>Конвертер валют</h2>
<form>
  <label for="firstcurrency">первая валюта</label>
  <select bind:value={selectedCurrency1}
  on:change={() => fetchData()}>
    {#each Object.keys(currencyData) as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </select>
  <input type="number" id="firstcurrency" bind:value={firstValue}
  on:change={() => getConvertedSecondValue()} min="0" />
  <br>
  <label for="secondcurrency">вторая валюта</label>
  <select bind:value={selectedCurrency2}
  on:change={() => fetchData()}>
    {#each Object.keys(currencyData) as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </select>
  <input type="number" id="secondcurrency" bind:value={secondValue}
  on:change={() => getConvertedFirstValue()} min="0" />
  <p>Актуальный курс: {currencyData[selectedCurrency2]}{selectedCurrency2} = {currencyData[selectedCurrency1]}{selectedCurrency1}</p>
</form>
