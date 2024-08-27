const apiUrl = 'http://localhost:3000/sales';

// Fetch and display sales
async function fetchSales() {
    const response = await fetch(apiUrl);
    const sales = await response.json();
    const salesList = document.getElementById('sales-list');
    salesList.innerHTML = '';
    sales.forEach(sale => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        // Use a check mark for true and an X for false
        const protectionPlanStatus = sale.protectionPlan ? '✔️' : '❌';
        const assemblyStatus = sale.assembly ? '✔️' : '❌';

        li.textContent = `Amount: $${sale.amount}, Protection Plan: ${protectionPlanStatus}, Assembly: ${assemblyStatus}`;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteSale(sale.id);
        li.appendChild(deleteButton);
        salesList.appendChild(li);
    });
}

// Add a new sale
async function createSale(amount, protectionPlan, assembly) {
    const newSale = {
        amount: parseFloat(amount),
        protectionPlan: protectionPlan,
        assembly: assembly
    };

    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSale)
    });

    fetchSales();
}

// Handle form submission
document.getElementById('sales-form').addEventListener('submit', event => {
    event.preventDefault();
    const amount = document.getElementById('amount').value;
    const protectionPlan = document.getElementById('protectionPlan').checked;
    const assembly = document.getElementById('assembly').checked;
    createSale(amount, protectionPlan, assembly);
    document.getElementById('sales-form').reset();
});

// Initial fetch to display sales
fetchSales();