export const IMAGE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

export function validateImage(file: File): { isValid: boolean; error?: string } {
  // 파일 이름이 영어로만 이루어졌는지 확인
  if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
    return {
      isValid: false,
      error: '파일 이름은 영어, 숫자, 점(.), 대시(-), 언더스코어(_)만 사용할 수 있습니다.',
    };
  }

  // 파일 크기 확인
  if (file.size > IMAGE_SIZE_LIMIT) {
    return {
      isValid: false,
      error: '파일 크기는 5MB 이하여야 합니다.',
    };
  }

  return { isValid: true };
} 