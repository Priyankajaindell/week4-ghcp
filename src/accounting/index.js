const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let balance = 1000.00;

function viewBalance() {
    console.log(`Current balance: ${balance.toFixed(2)}`);
}

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function credit() {
    const amountStr = await ask('Enter credit amount: ');
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount < 0) {
        console.log('Invalid amount.');
        return;
    }
    balance += amount;
    console.log(`Amount credited. New balance: ${balance.toFixed(2)}`);
}

async function debit() {
    const amountStr = await ask('Enter debit amount: ');
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount < 0) {
        console.log('Invalid amount.');
        return;
    }
    if (balance >= amount) {
        balance -= amount;
        console.log(`Amount debited. New balance: ${balance.toFixed(2)}`);
    } else {
        console.log('Insufficient funds for this debit.');
    }
}

async function main() {
    while (true) {
        console.log('--------------------------------');
        console.log('Account Management System');
        console.log('1. View Balance');
        console.log('2. Credit Account');
        console.log('3. Debit Account');
        console.log('4. Exit');
        console.log('--------------------------------');
        const choice = await ask('Enter your choice (1-4): ');
        switch (choice.trim()) {
            case '1':
                viewBalance();
                break;
            case '2':
                await credit();
                break;
            case '3':
                await debit();
                break;
            case '4':
                console.log('Exiting the program. Goodbye!');
                rl.close();
                process.exit(0);
            default:
                console.log('Invalid choice, please select 1-4.');
        }
    }
}

main();