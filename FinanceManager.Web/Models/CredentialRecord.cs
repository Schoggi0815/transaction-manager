using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FinanceManager.Web.Models;

public class CredentialRecord
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [StringLength(256)]
    public string RpId { get; set; }

    [Required]
    [MaxLength(128)]
    public byte[] UserHandle { get; set; }

    [Required]
    [MaxLength(1024)]
    public byte[] CredentialId { get; set; }

    [Required]
    public int Type { get; set; }

    [Required]
    public int Kty { get; set; }

    [Required]
    public int Alg { get; set; }

    public int? Ec2Crv { get; set; }

    [MaxLength(256)]
    public byte[]? Ec2X { get; set; }

    [MaxLength(256)]
    public byte[]? Ec2Y { get; set; }

    [MaxLength(1024)]
    public byte[]? RsaModulusN { get; set; }

    [MaxLength(32)]
    public byte[]? RsaExponentE { get; set; }

    public int? OkpCrv { get; set; }

    [MaxLength(32)]
    public byte[]? OkpX { get; set; }

    [Required]
    public long SignCount { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(max)")]
    public string Transports { get; set; }

    [Required]
    public bool UvInitialized { get; set; }

    [Required]
    public bool BackupEligible { get; set; }

    [Required]
    public bool BackupState { get; set; }

    [Column(TypeName = "varbinary(max)")]
    public byte[]? AttestationObject { get; set; }

    [Column(TypeName = "varbinary(max)")]
    public byte[]? AttestationClientDataJson { get; set; }

    [StringLength(200)]
    public string? Description { get; set; }

    [Required]
    public long CreatedAtUnixTime { get; set; }

    [Required]
    public long UpdatedAtUnixTime { get; set; }
}
