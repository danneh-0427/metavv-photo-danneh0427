import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('game')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id!: string; //maybe url?

  @Column('text')
  title!: string;

  @Column('text')
  standard!: string;

  @Column('text', { array: true })
  tags!: string[];

  @Column('int')
  password!: number;

  @Column('boolean')
  isPublic!: boolean;

  @OneToMany(() => Photo, (photo) => photo.game)
  photos!: Photo[];
}

@Entity('photo')
export class Photo {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('text')
  img!: string;

  @Column('int')
  score!: number;

  @ManyToOne(() => Game, (game) => game.photos)
  game!: Game;

  @OneToMany(() => Comment, (comment) => comment.photo)
  comments!: Comment[];
}

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('text')
  content!: string;

  @Column('text')
  name!: string;

  @ManyToOne(() => Comment, (comment) => comment.childrenComment, { nullable: true })
  parentComment!: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment, { nullable: true })
  childrenComment!: Comment[];

  @Column('boolean')
  isCreator!: boolean;

  @Column('boolean')
  onlyCreator!: boolean;

  @ManyToOne(() => Photo, (photo) => photo.comments)
  photo!: Photo;
}
