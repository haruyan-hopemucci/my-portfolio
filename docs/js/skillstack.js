const data = [
    {
        name: 'pl',
        skillset: [
            { skill: 'java', level: 5 },
            { skill: 'c#', level: 5 },
            { skill: 'VB.NET', level: 5 },
            { skill: 'python', level: 4 },
            { skill: 'php', level: 3 },
            { skill: 'javascript', level: 5 },
            { skill: 'perl', level: 5 },
            { skill: 'ruby', level: 3 },
            { skill: 'PL/SQL', level: 5 },
            { skill: 'Ladder', level: 3 },
        ]
    },
    {
        name: 'backend',
        skillset: [
            { skill: 'Spring MVC', level: 5 },
            { skill: 'Python + Flask', level: 4 },
            { skill: 'Python + Django', level: 4 },
            { skill: 'PHP + Smarty', level: 3 },
            { skill: 'PHP + Laravel', level: 3 },
            { skill: 'Node.js', level: 3 },
            { skill: 'OracleDatabase', level: 5 },
            { skill: 'MySQL', level: 4 },
            { skill: 'PostgreSQL', level: 3 },
            { skill: 'SQLite', level: 5 },
            { skill: 'SQL Server', level: 4 },
        ]
    },
    {
        name: 'frontend',
        skillset: [
            { skill: 'html', level: 5 },
            { skill: 'css', level: 5 },
            { skill: 'JQuery', level: 5 },
            { skill: 'Bootstrap', level: 5 },
            { skill: 'React', level: 3 },
            { skill: 'AngularJS', level: 3 },
        ]
    },
    {
        name: 'infrastracture',
        skillset: [
            { skill: 'Apache Web Server', level: 5 },
            { skill: 'Tomcat', level: 5 },
            { skill: 'heroku', level: 3 },
            { skill: 'RedhatLinux CentOS', level: 5 },
        ]
    },
    {
        name: 'virtualization',
        skillset: [
            { skill: 'Docker', level: 5 },
            { skill: 'Virtualbox', level: 5 },
            { skill: 'vagrant', level: 3 },
            { skill: 'Hyper-V', level: 4 },
            { skill: 'VMWare', level: 3 },
        ]
    },
];

for(let skillset of data){
    let o = document.querySelector(`#skillstack-${skillset.name}`);
    let template = document.querySelector('#skillstack-template');
    for(let skill of skillset.skillset){
        let ps = skill.level * 20;
        let e = document.importNode(template.content, true);
        e.querySelector('.skill-name').innerText = skill.skill;
        let bar = e.querySelector('.progress-bar');
        bar.innerText = `Level ${skill.level}`;
        // bar.style.width = `${ps}%`;
        bar.style.width = 0;
        bar.attributes['aria-valuenow'].value = `"${ps}"`;
        bar.dataset.value = ps;
        o.appendChild(e);
    }
}

/*
let elems = document.querySelectorAll('.progress-bar');
let t = 50;
for(let e of elems){
    setTimeout(() => {
        e.style.width = `${e.dataset.value}%`;
    }, t);
    t += 50;
}
*/
$('.skillstack-detail').on('inview', function (e, o) {
    //ブラウザの表示域に表示されたときに実行する
    console.log(e.target, o);
    let elems = e.target.querySelectorAll('.progress-bar');
    for(let elem of elems){
      elem.style.width = `${elem.dataset.value}%`;
    }
});
