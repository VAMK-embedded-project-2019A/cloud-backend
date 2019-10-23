import mongoose, { Schema, Document } from 'mongoose';

export interface ISong extends Document {
  name: string;
  fileName: string;
  tag: string;
}

const SongSchema: Schema = new Schema({
  name: { type: String, required: true },
  fileName: { type: String, required: true, unique: true },
  tag: { type: String, required: true }
});

export default mongoose.model<ISong>('Song', SongSchema)
