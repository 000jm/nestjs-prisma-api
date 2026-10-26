
import { ConflictError } from "./ConflictError.js"
import { PrismaClientError } from "./PrismaClientError.js"

export class UniqueConstraintError extends ConflictError {

    constructor(error: PrismaClientError) {
        const uniqueField = error.meta?.target

        super(`A record with this ${uniqueField} already exists`)
    }

}
