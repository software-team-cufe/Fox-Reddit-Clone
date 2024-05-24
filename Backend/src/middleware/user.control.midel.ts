import { Post } from '../model/posts.model';

/**
 * Merge two arrays of sorted post documents into a single sorted array.
 * @param firstArray The first array of post documents (sorted by creationDate)
 * @param secondArray The second array of post documents (sorted by creationDate)
 * @returns A single sorted array containing all posts from the input arrays
 */
async function mergeTwo(firstArray: Post[], secondArray: Post[]): Promise<Post[]> {
  // Initialize variables
  const lengthFirstArray = firstArray.length;
  const lengthSecondArray = secondArray.length;
  const mergedArray: Post[] = [];

  // Merge the two arrays while maintaining the sort order
  let indexFirstArray = 0,
    indexSecondArray = 0;
  while (indexFirstArray < lengthFirstArray && indexSecondArray < lengthSecondArray) {
    if (firstArray[indexFirstArray].createdAt <= secondArray[indexSecondArray].createdAt) {
      mergedArray.push(firstArray[indexFirstArray++]); // Append post from the first array if its creation date is earlier or equal
    } else {
      mergedArray.push(secondArray[indexSecondArray++]); // Append post from the second array if its creation date is earlier
    }
  }

  // Append remaining posts from the first and second arrays (if any)
  while (indexFirstArray < lengthFirstArray) {
    mergedArray.push(firstArray[indexFirstArray++]);
  }
  while (indexSecondArray < lengthSecondArray) {
    mergedArray.push(secondArray[indexSecondArray++]);
  }

  // Return the merged and sorted array of posts
  return mergedArray;
}
export default mergeTwo;
