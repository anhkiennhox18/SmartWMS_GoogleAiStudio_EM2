using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace SmartWMS.Data
{
    /// <summary>
    /// Lớp mở rộng của IdentityUser để thêm thuộc tính FullName. 
    /// (Hãy đổi thành class ApplicationUser thực tế trong dự án của bạn nếu đã có)
    /// </summary>
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
    }

    public static class DbInitializer
    {
        /// <summary>
        /// Phương thức khởi chạy từ cấu hình Program.cs để Seed dữ liệu.
        /// </summary>
        /// <param name="serviceProvider">Dependency Injection Container</param>
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            // Giải nén các dịch vụ quản lý Người dùng và Quyền từ DI
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            // 1. Khởi tạo các Quyền hệ thống (Seed Roles)
            string[] roleNames = { "Admin", "Staff" };
            
            foreach (var roleName in roleNames)
            {
                // Kiểm tra xem quyền này đã tồn tại trong DB chưa
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    // Tự động tạo quyền mới nếu không tìm thấy
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            // 2. Khởi tạo tài khoản Admin mặc định (Seed Admin User)
            string adminEmail = "admin@smartwms.com";
            
            // Kiểm tra xem Admin Email đã có trong bảng AspNetUsers chưa
            var adminUser = await userManager.FindByEmailAsync(adminEmail);
            
            if (adminUser == null)
            {
                // Nếu chưa có, tiến hành tạo một đối tượng ApplicationUser mới
                adminUser = new ApplicationUser
                {
                    UserName = "admin",
                    Email = adminEmail,
                    FullName = "System Administrator",
                    EmailConfirmed = true // Bỏ qua bước yêu cầu xác minh qua email
                };

                // Đặt mật khẩu mặc định mạnh (hoa, thường, số, ký tự đặc biệt)
                // Hàm CreateAsync sẽ tự động Hash (băm) mật khẩu an toàn đưa vào DB
                var createPowerUser = await userManager.CreateAsync(adminUser, "Admin@123456");

                if (createPowerUser.Succeeded)
                {
                    // 3. Gán quyền Admin (Assign Role)
                    // Khi tài khoản đã tạo thành công, tiến hành gắn vai trò tương ứng để cấp quyền
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }
        }
    }
}
