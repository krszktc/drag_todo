import { HttpStatus } from "@nestjs/common"

export const Success = (message: string) => {
  return { status: HttpStatus.OK, message }
}