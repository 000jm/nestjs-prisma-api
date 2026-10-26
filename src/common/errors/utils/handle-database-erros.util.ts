
import { DatabaseError } from "../types/DatabaseError.js"
import { PrismaClientError } from "../types/PrismaClientError.js"
import { UniqueConstraintError } from "../types/UniqueConstraintError.js"

enum PrismaErrors {
    UniqueContraintFail = 'P2002',
}

export const handleDatabaseErrors = (error: PrismaClientError): Error => {
    switch(error.code) {
        case PrismaErrors.UniqueContraintFail:
            return new UniqueConstraintError(error)
        default:
            return new DatabaseError(error.message)
    }
}
