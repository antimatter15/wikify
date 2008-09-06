Public Class Form1
    Dim enable_rwk As Boolean = True

    Private Sub GoToolStripMenuItem_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles GoToolStripMenuItem.Click
        WebBrowser1.Navigate(ToolStripTextBox1.Text)
    End Sub

    Private Sub BackToolStripMenuItem_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles BackToolStripMenuItem.Click
        WebBrowser1.GoBack()
    End Sub

    Private Sub ToolStripMenuItem1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles ToolStripMenuItem1.Click
        WebBrowser1.GoForward()
    End Sub

    Private Sub ToolStripMenuItem2_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles ToolStripMenuItem2.Click
        WebBrowser1.Refresh()
    End Sub

    Private Sub ExitToolStripMenuItem1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles ExitToolStripMenuItem1.Click
        Application.Exit()

    End Sub

    Private Sub WebBrowser1_DocumentCompleted_1(ByVal sender As System.Object, ByVal e As System.Windows.Forms.WebBrowserDocumentCompletedEventArgs) Handles WebBrowser1.DocumentCompleted
        ToolStripTextBox1.Text = WebBrowser1.Url.ToString
        If enable_rwk = True Then
            WebBrowser1.Navigate("javascript:(function(){var%20A=document.createElement('script');A.src='http://wikify.antimatter15.com/server/rwk?url='+window.location.href;document.getElementsByTagName('head')[0].appendChild(A)})()")

        End If

          End Sub

    Private Sub WebBrowser1_DocumentTitleChanged1(ByVal sender As Object, ByVal e As System.EventArgs) Handles WebBrowser1.DocumentTitleChanged
        Me.Text = WebBrowser1.Document.Title + " - Wikify Browser"
    End Sub

    Private Sub AboutWikifyToolStripMenuItem_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles AboutWikifyToolStripMenuItem.Click
        MessageBox.Show("Project Wikify (C) Animatter15 2008")
    End Sub

    Private Sub AboutToolStripMenuItem1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles AboutToolStripMenuItem1.Click
        MessageBox.Show("Wikify Browser v0.1 Alpha (C) Antimatter15 2008", "About Wikify Browser")
    End Sub


    Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        MessageBox.Show("Please Note that Wikify Browser only supports Read-Only Wikify")
    End Sub

    Private Sub DisableWikifyToolStripMenuItem_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles DisableWikifyToolStripMenuItem.Click

        If enable_rwk = True Then
            enable_rwk = False
            DisableWikifyToolStripMenuItem.Text = "Enable Wikify"
        Else
            enable_rwk = True
            DisableWikifyToolStripMenuItem.Text = "Disable Wikify"
        End If
        WebBrowser1.Navigate(WebBrowser1.Url)

    End Sub
End Class
