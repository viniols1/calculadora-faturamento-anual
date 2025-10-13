document.addEventListener('DOMContentLoaded', () => {
    const monthIds = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    const inputs = monthIds.map(id => document.getElementById(id));

    const calculateBtn = document.getElementById('calculateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultContainer = document.getElementById('result-container');
    const totalResultEl = document.getElementById('total-result');
    const averageResultEl = document.getElementById('average-result');

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const calculateRevenue = () => {
        let totalSum = 0;
        let monthsWithValue = 0;

        inputs.forEach(input => {
            const value = parseFloat(input.value) || 0;
            if (value > 0) {
                totalSum += value;
                monthsWithValue++;
            }
        });

        const average = monthsWithValue > 0 ? totalSum / 12 : 0;

        animateValue(totalResultEl, totalSum);
        animateValue(averageResultEl, average);

        resultContainer.classList.remove('hidden');
        resultContainer.classList.add('visible');
    };

    const animateValue = (element, endValue) => {
        let startValue = 0;
        const duration = 1500; 
        const range = endValue - startValue;
        let startTime = null;

        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentValue = startValue + range * progress;
            element.textContent = formatCurrency(currentValue);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    };

    const clearFields = () => {
        inputs.forEach(input => {
            input.value = '';
        });
        resultContainer.classList.remove('visible');
        resultContainer.classList.add('hidden');
        totalResultEl.textContent = formatCurrency(0);
        averageResultEl.textContent = formatCurrency(0);
    };

    calculateBtn.addEventListener('click', calculateRevenue);
    clearBtn.addEventListener('click', clearFields);
});