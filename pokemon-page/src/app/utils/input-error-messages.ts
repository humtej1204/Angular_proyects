export class InputErrors {
    private static validatorErrors = {
        required: 'Este campo es requerido',
    }

    static getErrorMessage(error: string) {
        for (const [key, value] of Object.entries(this.validatorErrors)) {
          if (key === error) return value;
        }
        return 'Validacion fallida, error no encontrado';
    }
}
