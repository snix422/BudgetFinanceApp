using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApp.Application.Common
{
    public record FileExportResult(byte[] Content, string ContentType, string FileName);

}