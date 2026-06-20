import { IBuyer, TPayment, TValidationErrors } from '../../types';

export class CustomerModel {
    payment: TPayment | null = null;
    address: string = '';
    email: string = '';
    phone: string = '';

    setPayment(value: TPayment): void {
        this.payment = value;
    }

    setAddress(value: string): void {
        this.address = value;
    }

    setEmail(value: string): void {
        this.email = value;
    }

    setPhone(value: string): void {
        this.phone = value;
    }

    getCustomerData(): IBuyer {
        return {
            payment: this.payment,
            address: this.address,
            email: this.email,
            phone: this.phone,
        };
    }

    clear(): void {
        this.payment = null;
        this.address = '';
        this.email = '';
        this.phone = '';
    }

    validateFields(): TValidationErrors {
        const errors: TValidationErrors = {};

        if (!this.payment) {
            errors.payment = 'Не выбран способ оплаты';
        }
        if (!this.address.trim()) {
            errors.address = 'Введите адрес доставки';
        }
        if (!this.email.trim()) {
            errors.email = 'Введите email';
        }
        if (!this.phone.trim()) {
            errors.phone = 'Введите телефон';
        }

        return errors;
    }
}
