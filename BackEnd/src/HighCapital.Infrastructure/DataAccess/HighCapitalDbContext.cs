
using HighCapital.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HighCapital.Infrastructure.DataAccess;

internal class HighCapitalDbContext : DbContext
{

    public DbSet<Bot> bots { get; set; }

    public DbSet<Message> messages { get; set; }
   
    public HighCapitalDbContext(DbContextOptions options) : base(options){}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
       
        base.OnModelCreating(modelBuilder);
    }
}
