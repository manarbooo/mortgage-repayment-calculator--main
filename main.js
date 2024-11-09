const form = document.querySelector('.mortgageForm');
const amountInput = document.querySelector('.amount');
const termInput = document.querySelector('.term');
const interestInput = document.querySelector('.interest');
const repaymentInput = document.querySelector('.repaymentInput');
const interestOnlyInput = document.querySelector('.interestOnlyInput');
const calculateButton = document.querySelector('.calculateButton');
const clearSpan = document.querySelector('.clearSpan');
const resultDiv = document.querySelector('.resultDiv');


const amountError = document.querySelectorAll('.errorSpan')[0];
const termError = document.querySelectorAll('.errorSpan')[1];
const interestError = document.querySelectorAll('.errorSpan')[2];
const radioError = document.querySelector('.errorSpan1');


function resetCalculator() {
    form.reset();
    resultDiv.innerHTML = `
    <img class="emptyImg" src="assets/images/illustration-empty.svg">
    <h2 class="emptyHeading">Results shown here</h2>
    <p class="emptyDescription">Complete the form and click “calculate repayments” to see what 
    your monthly repayments would be.</p>
    `;
}


function showError(input, errorSpan) {
    if(input.value ===''){
        errorSpan.classList.remove('invisible');
        return true;
    }else{
        errorSpan.classList.add('invisible');
        return false;
    }
}

function calculateMortgage() {
    const amountMissing = showError(amountInput, amountError);
    const termMissing = showError(termInput, termError);
    const interestMissing = showError(interestInput, interestError);

    if(!repaymentInput.checked && !interestOnlyInput.checked){
        radioError.classList.remove('invisible');

    }else{
        radioError.classList.add('invisible');
    }


    if(amountMissing || termMissing || interestMissing || (!repaymentInput.checked && !interestOnlyInput.checked)){
        return;
    }

    const principal = parseFloat(amountInput.value);
    const years = parseInt(termInput.value);
    const annualInterestRate = parseFloat(interestInput.value) / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfPayments = years * 12;

    let monthlyRepayment;
    let totalRepayment;

    if(repaymentInput.checked){
        monthlyRepayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
        totalRepayment = monthlyRepayment * numberOfPayments;

    }else if(interestOnlyInput.checked){
        monthlyRepayment = principal * monthlyInterestRate;
        totalRepayment = monthlyRepayment * numberOfPayments;
    }

    monthlyRepayment = monthlyRepayment.toFixed(2);
    totalRepayment = totalRepayment.toFixed(2);


    resultDiv.innerHTML = `
    <h2 class="resultHeading">Your results</h2>
    <p class="resultDescription">Your results are shown below based on the information you provided. 
    To adjust the results, edit the form and click “calculate repayments” again.</p>
    <div class="outputDiv">
      <p class="firstOutput">Your monthly repayments</p>
      <span class="firstOutputSpan">£${monthlyRepayment}</span>
      <div class="divider"></div>
      <p class="secondOutput">Total you'll repay over the term</p>
      <span class="secondOutputSpan">£${totalRepayment}</span>
    </div>
    `;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateMortgage();
});

clearSpan.addEventListener('click', resetCalculator);
