const { Controller, Post, Get, Patch, Body, Param, Headers, HttpException, HttpStatus, Inject } = require('@nestjs/common');
const { UserService } = require('./user.service');


@Controller('api/auth') // <--- Lưu ý: Đường dẫn gốc là /api/auth
class UserController {
  constructor(@Inject(UserService) userService) {
    this.userService = userService;
  }

  
  // --- 1. Đăng ký ---
  @Post('register')
  async register(@Body() registerDto) {
    if (!registerDto.email || !registerDto.password) {
      throw new HttpException('Email and password required', HttpStatus.BAD_REQUEST);
    }
    try {
      const user = await this.userService.register(registerDto);
      return {
        message: 'Registration successful. Please verify your email.',
        userId: user._id
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // --- 2. Đăng nhập ---
  @Post('login')
  async login(@Body() loginDto) {
    const { email, password } = loginDto;
    if (!email || !password) {
      throw new HttpException('Email and password required', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.userService.login(email, password);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  // --- 3. [MỚI] Lấy thông tin Profile từ Token (Fix lỗi Reload) ---
  @Get('profile') 
  async getProfileViaToken(@Headers('authorization') authHeader) {
    // 1. Kiểm tra header
    if (!authHeader) {
      throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    }

    // 2. Lấy token (Bỏ chữ 'Bearer ')
    const token = authHeader.replace('Bearer ', '');

    try {
      // 3. Giải mã token để lấy ID
      const decoded = await this.userService.verifyToken(token);
      
      // 4. Tìm user trong DB
      const user = await this.userService.getUserById(decoded.id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('Invalid or Expired Token', HttpStatus.UNAUTHORIZED);
    }
  }

  // --- Các hàm cũ giữ nguyên ---
  @Post('verify-email')
  async verifyEmail(@Body() body) {
    const { email, token } = body;
    if (!email || !token) throw new HttpException('Email and token required', HttpStatus.BAD_REQUEST);
    try {
      await this.userService.verifyEmail(email, token);
      return { message: 'Email verified successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('verify-token')
  async verifyToken(@Headers('authorization') authHeader) {
    const token = authHeader?.replace('Bearer ', '');
    if (!token) throw new HttpException('Token required', HttpStatus.BAD_REQUEST);
    try {
      const decoded = await this.userService.verifyToken(token);
      return { valid: true, user: decoded };
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  // Hàm cũ (lấy theo ID trên URL) - Có thể giữ lại hoặc không
  @Get('profile/:id')
  async getProfileById(@Param('id') id) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Patch('profile/:id')
  async updateProfile(@Param('id') id, @Body() updateDto) {
    return this.userService.updateProfile(id, updateDto);
  }

  @Patch('change-password/:id')
  async changePassword(@Param('id') id, @Body() body) {
    const { oldPassword, newPassword } = body;
    if (!oldPassword || !newPassword) throw new HttpException('Old and new passwords required', HttpStatus.BAD_REQUEST);
    try {
      await this.userService.changePassword(id, oldPassword, newPassword);
      return { message: 'Password changed successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

module.exports = { UserController };