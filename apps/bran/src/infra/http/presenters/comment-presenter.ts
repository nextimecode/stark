/* eslint-disable @typescript-eslint/no-explicit-any */
import { Comment } from '@/domain/forum/enterprise/entities/comment'

export class CommentPresenter {
  static toHTTP(comment: Comment<any>) {
    return {
      id: comment.id.toString(),
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt
    }
  }
}
