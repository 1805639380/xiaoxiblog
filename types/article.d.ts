export default interface articleType {
  article_id: string,
  article_title: string,
  article_snippet: string,
  article_pic: string,
  article_content: string,
  article_type: string,
  article_watch: number,
  comment_num: number,
  publish_date: string,
  user: userStateType,
  user_uid: number
}